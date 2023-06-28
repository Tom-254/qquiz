#!/usr/bin/env python3
"""Module to manage All aspects relating to Quiz Creation
"""
from models.question import Question
from models.question_general_detail import QuestionGeneralDetail
from models.question_category import QuestionCategory
from models.choice import Choice
from models.answer import Answer
from models.score import Score

from sqlalchemy.orm import joinedload
from sqlalchemy import or_, and_


class Questions:
    """
    Class to manage All aspects relating to Quiz Creation
    """

    def read_category(self, id: str) -> QuestionCategory:
        """Read a quiz general detail with the given id."""
        return QuestionCategory.get(id)

    def read_categories(self):
        """Read a quiz general detail with the given id."""
        return [category.to_json() for category in QuestionCategory.all()]

    def create_category(self, name: str) -> QuestionCategory:
        """Create a new category with the given name."""
        category = QuestionCategory(name=name)
        category.save()
        return category

    def update_category(self, id: str, name: str) -> None:
        """Update the name of the category with the given id."""
        category = QuestionCategory.get(id)
        category.name = name
        category.save()
        return category

    def delete_category(self, id: str) -> None:
        """Delete the category with the given id."""
        category = QuestionCategory.get(id)
        category.remove()

    def create_quiz_general_detail(self, request_data: dict()) -> QuestionGeneralDetail:
        """Create a new quiz general detail with the
        given title, category_id, description, and user_id."""
        general_detail = QuestionGeneralDetail(**request_data)
        general_detail.save()
        return general_detail

    def read_quiz_general_detail(self, id: str) -> QuestionGeneralDetail:
        """Read a quiz general detail with the given id."""
        return QuestionGeneralDetail.get(id)

    def submit_answers(self, request_data: dict()):
        user_id = request_data['user_id']
        general_detail_id = request_data['general_detail_id']

        general_detail = QuestionGeneralDetail.get_query().filter_by(id=general_detail_id).first()
        if not general_detail:
            return {'message': 'general_detail_id not found'}

        score = 0

        for answer_data in request_data['answers']:
            question_id = answer_data['question_id']
            choice_id = answer_data.get('choice_id')
            description = answer_data.get('description')

            question = Question.get_query().filter_by(
                id=question_id).first()

            if not question:
                return {'message': 'question_id not found'}

            if question.answer_type == 'multiple':

                choice = Choice.get_query().filter_by(
                    id=choice_id, question_id=question_id).first()

                if not choice:
                    return {'message': 'choice_id not found'}

                answer = Answer(
                    question_id=question_id,
                    user_id=user_id,
                    choice_id=choice_id,
                    score=int(choice.is_correct)
                )

                answer.add_obj()

                if choice.is_correct:
                    score += 1
            elif question.answer_type == 'description':
                answer = Answer(
                    question_id=question_id,
                    user_id=user_id,
                    description=description,
                    score=0
                )

                answer.add_obj()

        score_obj = Score(
            user_id=user_id,
            general_detail_id=general_detail_id,
            score=score
        )

        score_obj.add_obj()
        score_obj.save()

        return {'score': score}

    def get_user_quiz_groups_results(self, user_id: str):
        answers = Answer.get_query().filter_by(user_id=user_id).all()

        general_detail_ids = set(
            answer.question.general_detail_id for answer in answers)

        general_details = QuestionGeneralDetail.get_query().filter(
            QuestionGeneralDetail.id.in_(general_detail_ids)).all()

        data = []

        for general_detail in general_details:
            general_detail_data = {
                'id': general_detail.id,
                'title': general_detail.title,
                'category_id': general_detail.category_id,
                'user_id': general_detail.user_id,
                'description': general_detail.description,
                'questions': []
            }

            for question in general_detail.questions:
                question_data = {
                    'id': question.id,
                    'question': question.question,
                    'answer_type': question.answer_type,
                    'choices': [],
                    'user_answer': None
                }

                for choice in question.choices:
                    choice_data = {
                        'id': choice.id,
                        'choice': choice.name,
                        'is_correct': choice.is_correct
                    }

                    question_data['choices'].append(choice_data)

                answer = Answer.get_query().filter_by(
                    user_id=user_id, question_id=question.id).first()

                if answer:
                    question_data['user_answer'] = {
                        'id': answer.id,
                        'choice_id': answer.choice_id,
                        'score': answer.score
                    }

                general_detail_data['questions'].append(question_data)

            data.append(general_detail_data)

        return data

    def get_user_quiz_group_result(self, user_id: str, general_detail_id: str):
        general_detail = QuestionGeneralDetail.get_query().filter_by(
            id=general_detail_id).first()

        if general_detail:
            answers = Answer.get_query().filter_by(user_id=user_id, question_id=Question.id).join(
                Question).filter(Question.general_detail_id == general_detail_id).all()

            if not answers:
                return {'message': 'User has not taken this quiz'}

            general_detail_data = {
                'id': general_detail.id,
                'title': general_detail.title,
                'category_id': general_detail.category_id,
                'user_id': general_detail.user_id,
                'description': general_detail.description,
                'questions': []
            }

            for question in general_detail.questions:
                question_data = {
                    'id': question.id,
                    'question': question.question,
                    'answer_type': question.answer_type,
                    'choices': [],
                    'user_answer': None
                }

                for choice in question.choices:
                    choice_data = {
                        'id': choice.id,
                        'choice': choice.name,
                        'is_correct': choice.is_correct
                    }

                    question_data['choices'].append(choice_data)

                answer = Answer.get_query().filter_by(
                    user_id=user_id, question_id=question.id).first()

                if answer:
                    question_data['user_answer'] = {
                        'id': answer.id,
                        'choice_id': answer.choice_id,
                        'score': answer.score
                    }

                general_detail_data['questions'].append(question_data)

            return general_detail_data
        else:
            return {'message': 'Question not found'}

    def read_public_quiz_groups(self,
                                page: int, per_page: int):
        general_details = QuestionGeneralDetail.get_query().filter(
            QuestionGeneralDetail.visibility == 'public'
        ).options(
            joinedload(QuestionGeneralDetail.category),
            joinedload(QuestionGeneralDetail.questions).joinedload(
                Question.choices)
        ).limit(per_page).offset((page - 1) * per_page).all()
        total = QuestionGeneralDetail.get_query().filter(
            QuestionGeneralDetail.visibility == 'public'
        ).count()
        return {"data": general_details, "total": total}

    def create_quiz_group(self, request_data: dict()):
        general_detail_data = request_data['general_detail']

        general_detail = QuestionGeneralDetail(
            title=general_detail_data['title'],
            category_id=general_detail_data['category_id'],
            user_id=general_detail_data['user_id'],
            description=general_detail_data['description'],
            visibility=general_detail_data['visibility']
        )

        general_detail.add_obj()

        for question_data in request_data['questions']:
            question = Question(
                question=question_data['question'],
                answer_type=question_data['answer_type'],
                general_detail=general_detail,
            )

            question.add_obj()

            for choice_data in question_data['choices']:
                choice = Choice(
                    name=choice_data["name"],
                    is_correct=choice_data["is_correct"],
                    question=question
                )

                choice.add_obj()

        general_detail.save()
        return general_detail

    def update_quiz_group(self, general_detail_id: str, request_data: dict()):
        general_detail = QuestionGeneralDetail.get_query().filter_by(
            id=general_detail_id).first()
        if general_detail:
            for key, value in request_data['general_detail'].items():
                if key not in ('id', 'created_at', 'updated_at', '__class__'):
                    setattr(general_detail, key, value)

            # Update questions
            for question_data, question in zip(request_data['questions'],
                                               general_detail.questions):
                # Update question fields
                for key, value in question_data.items():
                    if key not in ('id', 'created_at', 'updated_at', '__class__', 'choices'):
                        setattr(question, key, value)

                # Update choices
                for choice_data, choice in zip(question_data['choices'], question.choices):
                    choice.name = choice_data['name']
                    choice.is_correct = choice_data['is_correct']

            general_detail.save()

            return general_detail
        else:
            return False

    def delete_quiz_group(self, general_detail_id: str):
        general_detail = QuestionGeneralDetail.get(general_detail_id)

        if general_detail:
            general_detail.remove()
            return True
        return False

    def read_user_quiz_groups(self,
                              page: int, per_page: int, user_id: str):

        general_details = QuestionGeneralDetail.get_query().filter(
            or_(
                QuestionGeneralDetail.visibility == 'public',
                and_(
                    QuestionGeneralDetail.visibility == 'private',
                    QuestionGeneralDetail.user_id == user_id
                )
            )
        ).options(
            joinedload(QuestionGeneralDetail.category),
            joinedload(QuestionGeneralDetail.questions).joinedload(
                Question.choices)
        ).limit(per_page).offset((page - 1) * per_page).all()

        total = QuestionGeneralDetail.get_query().filter(
            or_(
                QuestionGeneralDetail.visibility == 'public',
                and_(
                    QuestionGeneralDetail.visibility == 'private',
                    QuestionGeneralDetail.user_id == user_id
                )
            )
        ).count()
        return {"data": general_details, "total": total}

    def delete_quiz_general_detail(self, id: str) -> bool:
        """Delete a quiz general detail with the given id."""
        general_detail = QuestionGeneralDetail.get(id)
        if general_detail:
            general_detail.remove()
            return True
        return False

    def create_quiz(self, request_data: dict()) -> Question:
        """Create a new quiz with the given question,
        answer_type, general_detail_id, and user_id."""
        quiz = Question(**request_data)
        quiz.save()
        return quiz

    def create_quiz_with_choices(self, question_data, choices: list[str]) -> Question:
        """Create a new quiz with the given question, answer_type, general_detail_id, user_id, and choices."""
        quiz = Question(**question_data)

        for choice in choices:
            temp_choice = Choice(name=choice, question_id=quiz.id)
            temp_choice.add_obj()

        quiz.save()
        return {**quiz.to_json(), "choices": [{"id": choice.id, "name": choice.name} for choice in quiz.choices]}

    def read_quiz(self, id: str) -> Question:
        """Read a quiz with the given id."""
        return Question.get(id)

    def read_quizes_paginated(self, page: int, per_page: int, user_id: str = None) -> list[Question]:
        return Question.get_paginated_data(page, per_page)

    def delete_quiz(self, id: str) -> None:
        """Delete a quiz with a given id"""
        quiz = Question.get(id)
        if quiz:
            quiz.remove()
            return True
        return False

    def create_choice(self, choice: str, question_id: str) -> Choice:
        """Create a new choice with the given choice and question_id."""
        choice_object = Choice(choice=choice, question_id=question_id)
        choice_object.save()
        return choice_object

    def create_choices(self, choices: list[dict]) -> list[Choice]:
        """Bulk insert multiple choices using the values in the given list of dictionaries."""
        choice_objects = [Choice(**choice) for choice in choices]
        Choice.bulk_insert(choice_objects)
        choice_to_json = [obj.to_json() for obj in choice_objects]
        return choice_to_json

    def read_choice(self, id: str) -> Choice:
        """Read a choice with the given id."""
        return Choice.get(id)

    def update_choice(self, id: str, choice: str = None, question_id: str = None) -> None:
        """Update a choice with the given id."""
        choice_object = Choice.get(id)
        if choice is not None:
            choice_object.choice = choice
        if question_id is not None:
            choice_object.question_id = question_id
        choice_object.save()
        return choice_object

    def delete_choice(self, id: str) -> None:
        """Delete a choice with the given id."""
        choice_object = Choice.get(id)
        if choice_object:
            choice_object.remove()
            return True
        return False
