import { SVGProps } from 'react'

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <g fill="none">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M11 18a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0-12a5 5 0 0 0-5 5a1 1 0 1 0 2 0a3 3 0 0 1 3-3a1 1 0 1 0 0-2"
          clipRule="evenodd"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="m20 20l-2-2"
        ></path>
      </g>
    </svg>
  )
}
