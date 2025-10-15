import { ImageResponse } from "next/og";

export function generateImageMetadata() {
  return [
    {
      contentType: "image/png",
      size: { width: 16, height: 16 },
      id: "16",
    },
    {
      contentType: "image/png",
      size: { width: 32, height: 32 },
      id: "32",
    },
    {
      contentType: "image/png",
      size: { width: 48, height: 48 },
      id: "48",
    },
    {
      contentType: "image/png",
      size: { width: 320, height: 320 },
      id: "192",
    },
    {
      contentType: "image/png",
      size: { width: 192, height: 192 },
      id: "192",
    },
    {
      contentType: "image/png",
      size: { width: 512, height: 512 },
      id: "512",
    },
  ];
}

export default function Icon({ id }: { id: string }) {
  const { size } = generateImageMetadata().find((item) => item.id === id) || {
    size: { width: 180, height: 180 },
  };
  const { height, width } = size;

  const padding = Math.round(width * 0.125);
  const borderRadius = height > 100 ? "16px" : "8px";
  const svgSize = width - padding * 2;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: padding,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#191919",
          borderRadius: borderRadius,
        }}
      >
        <svg
          height={svgSize}
          width={svgSize}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M149.242 69.9406V0H110.241V69.9406L129.742 96.7209L149.242 69.9406Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M110.241 190.06V260H149.242V190.06L129.742 163.279L110.241 190.06Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M149.242 190.068L190.322 246.749L222.042 223.609L180.702 167.188L149.242 156.788V190.068Z"
            fill="#48E7CA"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M110.241 69.9413L69.1611 13.2607L37.4408 36.401L78.7811 92.8215L110.241 103.222V69.9413Z"
            fill="#48E7CA"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M78.7807 92.8243L12.2201 71.2441L0 108.424L66.5606 130.005L98.2809 119.865L78.7807 92.8243Z"
            fill="#3F59E4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M161.201 140.141L180.701 167.181L247.261 188.762L259.481 151.581L192.921 130.001L161.201 140.141Z"
            fill="#3F59E4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M192.921 130.005L259.481 108.424L247.261 71.2441L180.701 92.8243L161.201 119.865L192.921 130.005Z"
            fill="#FF44DD"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M66.5606 130.001L0 151.581L12.2201 188.762L78.7807 167.181L98.2809 140.141L66.5606 130.001Z"
            fill="#FF44DD"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M78.7811 167.188L37.4408 223.609L69.1611 246.749L110.241 190.068V156.788L78.7811 167.188Z"
            fill="#FF4F40"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M180.702 92.8215L222.042 36.401L190.322 13.2607L149.242 69.9413V103.222L180.702 92.8215Z"
            fill="#FF4F40"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    },
  );
}
