const LogoIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.42 50.37">
            <defs>
                <linearGradient
                    id="a"
                    y1="25.19"
                    x2="50.42"
                    y2="25.19"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#278cff" />
                    <stop offset=".49" stop-color="#4ad8b9" />
                    <stop offset=".99" stop-color="#5ef084" />
                </linearGradient>
            </defs>
            <path
                d="M0 25.17C8.43 16.78 16.78 8.32 25.25 0 33.61 8.41 42 16.77 50.4 25.19c-2.07 2.1-4.19 4.17-6.26 6.28q3.13 3.15 6.28 6.28C46.23 42 42 46.16 37.82 50.37c-2.1-2.13-4.37-4.12-6.29-6.4-.1-4.16 0-8.31 0-12.46h12.5c-6.13-6.4-12.52-12.55-18.74-18.87C19 18.89 12.62 25.13 6.41 31.5h12.5v12c.07.56-.36.93-.71 1.28-1.86 1.84-3.72 3.69-5.55 5.55C8.38 46.23 4.21 42 0 37.77q3.18-3.14 6.31-6.29C4.22 29.36 2.1 27.28 0 25.17z"
                fill='url("#a")'
            />
        </svg>
    );
};

export default LogoIcon;
