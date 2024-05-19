import {_useAsync} from "ik-hooks"

async function fetchAllData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  return await response.json();
}

function TodoItem({todo}: { todo: { title: string, completed: boolean, id: number } }) {
  return (
    <div style={{
      border: "1px solid #333",
      background: "#1a1a1a",
      padding: 10,
      borderRadius: 5,
    }}>
      <div
        style={{color: "gray", fontSize: 12}}
      >
        <strong>Todo Id:</strong>
        <span>{todo.id}</span>
      </div>
      <strong style={{textDecorationLine: todo.completed ? "line-through" : "blink"}}>{todo.title}</strong>
      <br/>
      <span style={{color: "gray", fontSize: 12}}>{todo.completed ? "Completed" : "Not Completed"}</span>
    </div>
  )
}

function UseAsync() {
  const {value: allData, inProgress: allDataProgress, execute} = _useAsync<{
    title: string,
    id: number,
    completed: boolean
  }[]>(fetchAllData)

  return (
    <div>
      <h2>Use Async</h2>
      <button onClick={execute}>Reload Todos</button>
      <div style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        gap: 0,
      }}>
        <div style={{textAlign: "start"}}>
          {allDataProgress ? "Loading..." : (
            <div className={"cards"}>
              <div className={"cards-body"}>
                {allData?.map((item: { id: number; title: string; completed: boolean; }) => <TodoItem todo={item}
                                                                                                      key={item.id}/>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UseAsync;