import { vi } from "vitest";
import { renderWithProviders } from "../../../utils/tests-utils";
import { Modal } from "../Modal";
import { fireEvent, screen } from "@testing-library/react";

describe("Modal.tsx", () => {
  const mockHandleClose = vi.fn();
  const setup = () =>
    renderWithProviders(
      <Modal show={true} title="Test" onClose={mockHandleClose}>
        <div>HELLO WORLD</div>
      </Modal>,
      {}
    );
  it("should render the modal and close on button click", () => {
    setup();
    const closeBtn = screen.getByLabelText("close-button");
    expect(closeBtn).toBeDefined();
    fireEvent.click(closeBtn);
    expect(mockHandleClose).toBeCalledTimes(1);
  });
});
