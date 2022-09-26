import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import "./SearchBox.scss";
const SearchBox = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="search__card">
      <form onSubmit={submitHandler}>
        <Input
          label="Title"
          placeholder="Can I know the paticular question you want"
          type="text"
        />
        <div className="search__card--input">
          <Input label="Offset" placeholder="From where?" type="number" />
          <Input label="Limit" placeholder="To where?" type="number" />
        </div>
        <div className="search__card--button">
          <div className="search__card--paragraph">
            <p>Total questions: 20 </p>
            <p>Unaswered questions: 10 </p>
          </div>
          <Button>Search</Button>
        </div>
      </form>
    </Card>
  );
};
export default SearchBox;
