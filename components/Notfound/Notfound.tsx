const Notfound = ({ item }: { item: string }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-center text-sm text-stone-800">No {item} found.</p>
    </div>
  );
};

export default Notfound;
