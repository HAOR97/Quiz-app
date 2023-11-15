function QuizTitle(props) {
  return (
    <h1 className='text-5xl font-bold text-emerald-500'>
      {props.children}
    </h1>
  );
}

export default QuizTitle;
