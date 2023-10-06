interface ContainerType {
  children: React.ReactNode;
}

const Container: React.FC<ContainerType> = ({ children }) => {
  return (
    <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
