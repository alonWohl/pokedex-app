export const svgs = {
  search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
      <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
    </svg>
  ),
  back: () => (
    <svg xmlns="http://www.w3.org/2000/svg" height={50} width={50} version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
      <path d="m20.391 51.75c-0.47266-0.46094-0.74219-1.0898-0.74219-1.75s0.26953-1.2891 0.74219-1.75l19.391-19c0.96094-0.96875 0.96484-2.5352 0.007812-3.5117-0.95703-0.97266-2.5195-1-3.5078-0.058593l-19.391 19c-1.4336 1.3984-2.2383 3.3164-2.2383 5.3203s0.80469 3.9219 2.2383 5.3203l19.391 19c0.46484 0.46094 1.0938 0.71484 1.75 0.71094 1.0117-0.003906 1.9258-0.61719 2.3086-1.5547 0.38281-0.9375 0.16016-2.0156-0.55859-2.7266z" />
      <path d="m82.852 47.5h-65.312c-1.3789 0-2.5 1.1211-2.5 2.5s1.1211 2.5 2.5 2.5h65.312c1.3789 0 2.5-1.1211 2.5-2.5s-1.1211-2.5-2.5-2.5z" />
    </svg>
  ),
  more: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={'#000000'} fill={'none'}>
      <path d="M8 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 5H4.00898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12H4.00898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19H4.00898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  pokeball: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={96}
      height={96}
      viewBox="0 0 100 100"
      enableBackground="new 0 0 100 100"
      xmlSpace="preserve"
      {...props}>
      <g>
        <path d="M36.489,48.283c1.397-6.445,7.305-11.387,14.181-11.387s12.676,4.941,14.179,11.387h23.638   C86.838,28.41,70.157,12.725,49.867,12.725c-20.291,0-36.972,15.686-38.619,35.559H36.489z" />
      </g>
      <g>
        <path d="M64.849,54.729c-1.395,6.446-7.41,11.387-14.286,11.387s-12.676-4.94-14.182-11.387H11.248   c1.647,19.875,18.328,35.559,38.619,35.559c20.29,0,36.971-15.684,38.619-35.559H64.849z" />
      </g>
      <g>
        <path d="M42.507,51.506c0,4.512,3.651,8.164,8.163,8.164c4.513,0,8.164-3.652,8.164-8.164s-3.651-8.164-8.164-8.164   C46.158,43.342,42.507,46.994,42.507,51.506z" />
      </g>
    </svg>
  )
}
