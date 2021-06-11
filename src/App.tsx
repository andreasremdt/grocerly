import Header from "./components/Header";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Header />
      <List groceries={[]} />
      <Form />
    </>
  );
}

export default App;
