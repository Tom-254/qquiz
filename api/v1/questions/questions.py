#!/usr/bin/env python3
"""Module to manage All aspects relating to Quiz Creation
"""
from models.question import Question
from models.question_general_detail import QuestionGeneralDetail
from models.question_category import QuestionCategory
from models.choice import Choice

class Questions:
    """Class to manage All aspects relating to Quiz Creation
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

    def update_quiz_general_detail(self, id: str, title: str = None, category_id: str = None,
                                   description: str = None,
                                   user_id: str = None) -> None:
        """Update a quiz general detail with the given id."""
        general_detail = QuestionGeneralDetail.get(id)
        if title is not None:
            general_detail.title = title
        if category_id is not None:
            general_detail.category_id = category_id
        if description is not None:
            general_detail.description = description
        if user_id is not None:
            general_detail.user_id = user_id
        general_detail.save()

    def delete_quiz_general_detail(self, id: str) -> None:
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

        quiz.choices = [Choice(name=choice) for choice in choices]
        quiz.save()
        return {**quiz.to_json(), "choices" : [{"id": choice.id, "name": choice.name} for choice in quiz.choices]}

    def read_quiz(self, id: str) -> Question:
        """Read a quiz with the given id."""
        return Question.get(id)

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
