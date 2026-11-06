import { fireEvent, render } from "@testing-library/react";
import SectionLink from "./index";

/*
Тесты SectionLink: узел заключения выглядит как прежде (<span>/<div>
с `data-id`), но ведёт себя как кнопка — клик и Enter/Space открывают
раздел, прочие клавиши игнорируются.
*/

describe("SectionLink", () => {
  it("рисует span с ролью кнопки и открывает раздел по клику", () => {
    const onToggle = vi.fn();

    const { container } = render(
      <SectionLink
        section="zhaloby"
        className="list__section"
        onToggle={onToggle}
      >
        жалобы
      </SectionLink>
    );

    const link = container.firstElementChild as HTMLElement;

    expect(link.tagName).toBe("SPAN");
    expect(link.className).toBe("list__section");
    expect(link.getAttribute("data-id")).toBe("zhaloby");
    expect(link.getAttribute("role")).toBe("button");
    expect(link.getAttribute("tabindex")).toBe("0");
    expect(link.textContent).toBe("жалобы");

    fireEvent.click(link);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("по Enter и пробелу открывает раздел и отменяет действие по умолчанию", () => {
    const onToggle = vi.fn();

    const { container } = render(
      <SectionLink section="affekt" onToggle={onToggle}>
        аффект
      </SectionLink>
    );

    const link = container.firstElementChild as HTMLElement;

    // fireEvent возвращает false, если обработчик вызвал preventDefault
    expect(fireEvent.keyDown(link, { key: "Enter" })).toBe(false);
    expect(fireEvent.keyDown(link, { key: " " })).toBe(false);

    expect(onToggle).toHaveBeenCalledTimes(2);

    // остальные клавиши ничего не открывают
    expect(fireEvent.keyDown(link, { key: "a" })).toBe(true);
    expect(onToggle).toHaveBeenCalledTimes(2);
  });

  it('рисует div при as="div" и не падает без обработчика', () => {
    const { container } = render(
      <SectionLink section="diagnoz" as="div">
        диагноз
      </SectionLink>
    );

    const link = container.firstElementChild as HTMLElement;

    expect(link.tagName).toBe("DIV");
    expect(link.getAttribute("data-id")).toBe("diagnoz");

    // обработчика нет: клавиша не открывает раздел, но и не ломает узел
    expect(fireEvent.keyDown(link, { key: "Enter" })).toBe(false);
    expect(fireEvent.click(link)).toBe(true);
  });
});
