import Image from 'next/image';

export function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function Spinner() {
  return (
    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function Logo(props: any) {
  return (<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={32}
    height={32}
    viewBox="139.4 94.4 61.2 61.2"
    colorInterpolationFilters="sRGB"
    {...props}
  >
    <defs>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fa71cd" />
        <stop offset="100%" stopColor="#9b59b6" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f9d423" />
        <stop offset="100%" stopColor="#f83600" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0064d2" />
        <stop offset="100%" stopColor="#1cb0f6" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f00978" />
        <stop offset="100%" stopColor="#3f51b1" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7873f5" />
        <stop offset="100%" stopColor="#ec77ab" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f9d423" />
        <stop offset="100%" stopColor="#e14fad" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#009efd" />
        <stop offset="100%" stopColor="#2af598" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fc0" />
        <stop offset="100%" stopColor="#00b140" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d51007" />
        <stop offset="100%" stopColor="#ff8177" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a2b6df" />
        <stop offset="100%" stopColor="#0c3483" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7ac5d8" />
        <stop offset="100%" stopColor="#eea2a2" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00ecbc" />
        <stop offset="100%" stopColor="#007adf" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#b88746" />
        <stop offset="100%" stopColor="#fdf5a6" />
      </linearGradient>
    </defs>
    <g transform="translate(140 95)" className="">
      <path fill="none" className="image-rect" d="M0 0H60V60H0z" />
      <svg
        filter="url(#a)"
        width={60}
        height={60}
        className="image-svg-svg primary"
        overflow="visible"
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="16.399999618530273 16.399999618530273 67.19999694824219 67.19999694824219"
          enableBackground="new 0 0 100 100"
          {...props}
        >
          <path d="M50 16.4L16.4 50 50 83.6 83.6 50 50 16.4zM31.1 56.1c1.1-.8 3.1-.5 5.4.7.5.3 1.5 1.3 2.5 2.2l.5.5-5.4 5.4-4.3-4.3c-.1-2.2.3-3.8 1.3-4.5zm9.2 4.1c2 1.9 4.2 3.6 6 3.6.2 0 .4 0 .5-.1.6-.1 1.4-.5 1.9-1.7.8-2-.4-4.7-2.5-7.8l3.8-3.8 11.7 11.7c-1.3 1.6-2.9 3-4.6 4.3-3.7 3.1-7.6 6.2-8.3 13.1l-14-14 5.5-5.3zm1.4-1.4l3-3c2.2 3.2 2.4 4.8 2.1 5.5-.2.5-.4.5-.5.5-.9.2-3-1.5-4.6-3zm-.6-30.7c2-1 3.4.5 5.6 3.1 1.6 1.9 3.2 3.9 5.5 4.3.3 0 .6.1.9.1 1.8 0 3.6-.7 5.1-2 1.1-1 2-2.3 2.4-3.7l4.3 4.3-10.4 10.3H52c-1.2 0-1.3-.3-1.7-1.6-.3-.8-.7-1.9-1.6-2.9-1.1-1.1-1.9-2.7-2.7-4.4-1.2-2.6-2.6-5.5-5.4-6.9l.5-.6zm3.1 8.4c.9 1.8 1.7 3.6 3 4.9.6.7.9 1.5 1.2 2.2.5 1.3 1.1 2.9 3.6 2.9h.5L50 49 35.1 34.1l3.9-3.9c2.6 1 3.9 3.6 5.2 6.3zm9.7 10c4.3.1 7.8.5 9.7 2.6 1.1 1.3 1.5 3.2 1.2 5.8-.4 2.7-1.2 4.8-2.5 6.5L50.7 49.8l3.2-3.3zm-4.6 3.3l-3.7 3.7c-1.4-1.9-3-3.8-4.7-5.7-.2-.3-.4-.5-.6-.6-1.7-2.2-3.5-2-4.9-1.8-1 .1-1.6.1-2.2-.4-.2-1.6-1.2-5.4-1.8-7.1l3-3 14.9 14.9zM58.4 68c1.7-1.4 3.3-2.7 4.8-4.4l2 2L50.8 80c.6-6.3 4-9.1 7.6-12zm5.3-5.2c1.5-2 2.6-4.4 3-7.7.4-3.2-.1-5.6-1.6-7.4-2.1-2.4-5.7-3-9.2-3.2l9.7-9.7L80.8 50 65.9 64.9l-2.2-2.1zm-4.8-34.7c-.1 1.4-.8 2.8-2 3.9s-2.8 1.6-4.3 1.4c-1.5-.3-2.9-1.9-4.3-3.6-1.4-1.6-2.9-3.5-4.9-4l6.7-6.7 8.8 9zM29.8 39.4c.6 1.9 1.4 5.2 1.4 5.9v.4l.2.3c1.3 1.5 2.9 1.4 4.1 1.3 1.2-.1 2.1-.2 3.2 1.1.2.2.4.4.6.7 2.1 2.3 3.6 4.2 4.8 5.8L41 58.1l-.5-.5c-1.2-1.2-2.2-2.1-3-2.5-3.1-1.6-5.8-1.8-7.5-.6-.9.6-1.9 1.8-2.1 4.2L19.2 50l10.6-10.6z" />
        </svg>
      </svg>
      <defs>
        <filter id="a">
          <feColorMatrix
            values="0 0 0 0 0.0078125 0 0 0 0 0 0 0 0 0 0.04296875 0 0 0 1 0"
            className="icon-feColorMatrix"
          />
        </filter>
        <filter>
          <feColorMatrix
            values="0 0 0 0 0.99609375 0 0 0 0 0.99609375 0 0 0 0 0.99609375 0 0 0 1 0"
            className="icon-fecolormatrix"
          />
        </filter>
        <filter>
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            className="icon-fecolormatrix"
          />
        </filter>
      </defs>
    </g>
  </svg>);
}

export function VercelLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      aria-label="Vercel logomark"
      height="64"
      role="img"
      viewBox="0 0 74 64"
    >
      <path
        d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
