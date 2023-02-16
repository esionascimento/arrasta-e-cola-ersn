import { useState } from "react";
import ComponentArrastaCola from "./components/ComponentArrastaCola";
import "./ArrastaSolte.css";
import { arrasteSolteHeader } from "./_mock";

type TListObject = {
  id: number;
  label: string;
};

function App() {
  const [items1, setItems1] = useState<TListObject[]>([
    { id: 1, label: "A" },
    { id: 2, label: "B" },
  ]);
  const [items2, setItems2] = useState<TListObject[]>([
    { id: 12, label: "L" },
    { id: 13, label: "M" },
  ]);

  return (
    <div className="App">
      <ComponentArrastaCola
        nameListOne="Lista 1"
        nameListTwo="Lista 2"
        header={arrasteSolteHeader}
        listOne={items1}
        listTwo={items2}
        setListOne={setItems1}
        setListTwo={setItems2}
      />
    </div>
  );
}

export default App;
