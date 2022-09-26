import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";

import "./NewQuestion.scss";
const NewQuestion = () => {
  const submitHandler = (e) => {
    e.preventDefault();

    // Each input value can be gotten by its name attributes
    // console.log(e.target.title);

    // Or the whole form (An array)
    const form = e.target;

    // const title = form[0].value;
    // const question = form[1].value;
    // const files = form[2].files;

    form.reset();
  };
  return (
    <Card className="new__question--card">
      <form onSubmit={submitHandler}>
        <Input
          label="Title"
          type="text"
          placeholder="Give your question a title"
          name="title"
        />
        <Input
          field="textarea"
          label="Question"
          type="text"
          placeholder="Type your question here. Be detailed!"
        />
        <Input label="Upload file(s)" type="file" multiple="multiple" />
        
        <div className="new__question--box">
          <Button type="submit">Ask!</Button>
        </div>
      </form>
    </Card>
  );
};
export default NewQuestion;
