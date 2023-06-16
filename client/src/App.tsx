import "./App.css";
import { Button } from './components'
import { ReactComponent as RightArrow} from './assets/long-right-arrow.svg'

function App() {
  return (
    <main className="w-[400px]">
      <Button type="tertiary" full={false} buttonIconRight={<RightArrow />}>
        Hello
      </Button>
    </main>
  );
}

export default App;
