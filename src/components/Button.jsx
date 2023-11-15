function Button(props) {
  return (
    <button {...props} className='text-white bg-blue-400 p-4 rounded-lg enabled:hover:bg-blue-500 disabled:bg-gray-400 disabled:opacity-75'>
      {props.children}
    </button>
  );
}

export default Button;
