import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  fireEvent.change(screen.getByPlaceholderText("Add a new todo"), {
    target: { value: "Test new todo" },
  });
  fireEvent.click(screen.getByText("Add"));
  expect(screen.getByText("Test new todo")).toBeInTheDocument();
});

test("toggles a todo", () => {
  render(<TodoList />);
  const checkbox = screen.getAllByRole("checkbox")[0];
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test("deletes a todo", () => {
  render(<TodoList />);
  fireEvent.click(screen.getAllByText("Delete")[0]);
  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
