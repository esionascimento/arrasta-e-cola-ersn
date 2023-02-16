import React, { Dispatch, SetStateAction } from "react";

function ComponentArrastaCola({
  nameListOne,
  nameListTwo,
  header,
  listOne,
  listTwo,
  setListOne,
  setListTwo,
}: any) {
  function handleDragStart(e: any, item: any) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
  }

  const findObjectIndexById = (array: Array<any>, id: number) => {
    return array.findIndex((object) => object.id === Number(id));
  };

  const findObjectById = (array: Array<any>, id: number) => {
    return array.find((object) => object.id === id);
  };

  const verifyIndexOneNegative = (list: Array<any>, index: number) => {
    if (list[index].id === -1) {
      const indexOneNegative = list.findIndex((object) => object.id === -1);
      return indexOneNegative;
    }
    return index;
  };

  const reorderedArray = (list: Array<any>) => {
    const filteredArray = list.filter((obj) => obj.id !== -1);
    const finalArray = filteredArray.concat(
      list.filter((obj) => obj.id === -1)
    );
    return finalArray;
  };

  function handleDrop(
    e: any,
    list: Array<any>,
    setItems: Dispatch<SetStateAction<Array<any>>>,
    nameList: string
  ) {
    e.stopPropagation();
    const idOrigem: number = Number(e.dataTransfer.getData("text/plain"));
    const idDestino: number = Number(e.target.id);
    let updatedItems = [...list];
    const index = findObjectIndexById(updatedItems, Number(idOrigem));

    if (index >= 0) {
      updatedItems.splice(index, 1);
      updatedItems.splice(idDestino, 0, findObjectById(list, Number(idOrigem)));
      updatedItems = reorderedArray(updatedItems);
    } else {
      if (nameList === "list1") {
        updatedItems.splice(idDestino, 0, findObjectById(listTwo, idOrigem));
        const indexById = findObjectIndexById(listOne, -1);
        if (indexById !== -1) updatedItems.splice(indexById + 1, 1);
        setListTwo(listTwo.filter((i: any) => i.id !== idOrigem));
      } else {
        const position = verifyIndexOneNegative(listTwo, idDestino);
        updatedItems.splice(position, 0, findObjectById(listOne, idOrigem));
        setListOne(listOne.filter((i: any) => i.id !== idOrigem));
        listOne.length === 1 && setListOne([{ id: -1, label: "" }]);
      }
    }
    setItems(updatedItems);
    return false;
  }

  function handleDragEnd(e: any) {
    e.target.style.opacity = "1";
  }

  function handleDragOver(e: any) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }

  function handleDragEnter(e: any) {
    e.target.classList.add("over");
  }

  function handleDragLeave(e: any) {
    e.target.classList.remove("over");
  }

  return (
    <div className="container">
      <div>
        <h3>{nameListOne}</h3>
        <div className="list1">
          {listOne.map((item: any, index: any) => (
            <div
              key={index}
              id={String(index)}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, listOne, setListOne, "list1")}
              className="box"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "10px" }}>{nameListTwo}</h3>
        <div
          style={{
            display: "flex",
            overflowY: "hidden",
            overflowX: "scroll",
            height: "100px",
          }}
        >
          <div className="list2">
            {listTwo.map((item: any, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    marginBottom: "10px",
                    border: "1px solid silver",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  }}
                >
                  {header[index]}
                </div>
                <div
                  id={String(index)}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, listTwo, setListTwo, "list2")}
                  className="box2"
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentArrastaCola;
