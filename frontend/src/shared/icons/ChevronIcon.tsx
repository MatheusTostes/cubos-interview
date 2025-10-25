import { SVGProps } from 'react'

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="m18 9l-6 6l-6-6"
      ></path>
    </svg>
  )
}
