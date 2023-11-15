function Container(props) {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <div className='flex flex-col w-[65%] h-[65%] bg-white rounded-2xl p-8'>
        {props.children}
      </div>
    </div>
  );
}

export default Container;
