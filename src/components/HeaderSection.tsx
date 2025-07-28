import { Link } from "react-router-dom"

type HeaderSectionProps = {
  title: string,
  subtitle: string,
  linkValue: string,
  linkPath: string
}

export default function HeaderSection({title, subtitle, linkValue, linkPath} : HeaderSectionProps) {
  return (
    <div className="text-center sm:text-left">
      <h1 className="text-5xl font-black break-words">{title}</h1>
      <p className="text-2xl font-light text-gray-500 mt-5 break-words">{subtitle}</p>

      <nav className="my-5">
        <Link 
          to={linkPath}
          className="bg-purple-400 hover:bg-purple-500 text-white px-10 py-3 text-xl font-bold cursor-pointer transition-colors block sm:inline"
        >{linkValue}</Link>
      </nav>
    </div>
  )
}
