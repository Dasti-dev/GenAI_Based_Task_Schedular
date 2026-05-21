function LoadingSkeleton() {

  return (

    <div className="
      bg-zinc-900
      border border-zinc-800
      rounded-2xl
      p-6
      animate-pulse
    ">

      <div className="
        h-6
        w-40
        bg-zinc-800
        rounded-lg
        mb-4
      " />

      <div className="
        h-20
        bg-zinc-800
        rounded-xl
      " />

    </div>
  );
}

export default LoadingSkeleton;