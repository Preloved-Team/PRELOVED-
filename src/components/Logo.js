import logo from "./Assets/logo.svg"; 

export default function Logo({ size = 48 }) {
  return (
    <img
      src={logo}
      width={size}
      height={size}
      alt="Company logo"
      style={{ display: "block" }}
    />
  );
}
