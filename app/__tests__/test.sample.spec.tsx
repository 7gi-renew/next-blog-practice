import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Title from "../components/Title";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Title />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
