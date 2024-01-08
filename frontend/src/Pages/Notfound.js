

const Notfound = () => {
  return (
<div className="flex items-center justify-center h-screen space-y-5">  
  <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
    <p className="font-mono text-red-500 text-9xl dark:text-red-600 self-center md:self-start">
      404
    </p>
    <div className="space-y-2 text-justify md:text-left">
      <h1 className="flex items-center space-x-2">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 1024 1024"
          className="text-gray-600"
          height={34}
          width={34}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M464 720a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z" />
        </svg>
        <span className="text-xl font-medium text-gray-600 sm:text-2xl">
          Oops! Page non trouvée.
        </span>
      </h1>
      <p className="text-base font-normal text-gray-600 ">
        La page que vous recherchez n'a pas été trouvée.
      </p>
      <p className="text-base font-normal text-gray-600 ">
        Vous pouvez retourner à{" "}
        <a className="text-blue-600 hover:underline" href="/">
          l'acceuil
        </a>
       
      </p>
    </div>
  </div>
  </div>
  
  )
}

export default Notfound