import { JSX } from "react";

export default function renderJsonToHtml(data: any): JSX.Element {
  if (data === null || data === undefined) return <span>{String(data)}</span>;

  if (typeof data === "object") {
    if (Array.isArray(data)) {
      return (
        <ul className="list-disc ml-4 text-sm space-y-1">
          {data.map((item, index) => (
            <li key={index}>{renderJsonToHtml(item)}</li>
          ))}
        </ul>
      );
    }

    return (
      <ul className="list-disc ml-4 text-sm space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {renderJsonToHtml(value)}
          </li>
        ))}
      </ul>
    );
  }

  return <span>{String(data)}</span>;
}
