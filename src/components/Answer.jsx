function handleClassPerState(state) {
  switch (state) {
    case 'CORRECT':
      return 'border-emerald-400 bg-emerald-50';
    case 'WRONG':
      return 'border-red-400 bg-red-50';
    case 'NONE':
      return 'border-stone-100';
  }
}

function Answer(props) {
  // Set inital classes
  let classes = 'hover:bg-blue-50 hover:border-blue-400';

  // If answer is not disabled check isSelected state
  if (!props.disabled) {
    classes += props.isSelected
      ? ' border-blue-400 bg-blue-50'
      : ' border-stone-100';
  }

  // Overwrite all classes if answer is disabled
  if (props.disabled) {
    classes = handleClassPerState(props.state);
  }

  return (
    <li
      onClick={props.onClick}
      className={`p-4 flex-1 flex justify-center items-center border-2 rounded-2xl text-lg cursor-pointer ${classes}`}
    >
      {props.children}
    </li>
  );
}

export default Answer;
