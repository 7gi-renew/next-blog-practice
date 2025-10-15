import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Cards from "../components/Cards";
import MoveButton from "../components/MoveButton";

const mockData = {
  href: "/",
  heading: "テスト見出し",
  eyecatch: {
    url: "https://images.microcms-assets.io/assets/c40f5f7d4fc2441ca54daeff9ff7ad21/fba46f876d1e4c84bc308b0e613a488c/blog-template.png",
  },
};

const mockedRouter = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockedRouter,
  }),
  usePathname: jest.fn().mockReturnValue("/blogs/"),
}));

describe("Cardsコンポーネントのテスト", () => {
  it("見出しを見ることができる", () => {
    render(<Cards href={mockData.href} heading={mockData.heading} article={true} target={true} thumb={""} />);

    expect(screen.queryByText("テスト見出し")).toBeInTheDocument();
  });

  it("記事ページのカードの時はQiitaのサムネ画像が登録されている", () => {
    render(<Cards href={mockData.href} heading={mockData.heading} article={true} target={true} thumb={""} />);
    const imageUrl = screen.getByRole("img");
    expect(imageUrl).toHaveAttribute("src", "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9SmF2YVNjcmlwdCVFMyU4MSVBN1VSTCVFMyU4MSU4QiVFMyU4MiU4OU9HUCVFNSU4RiU5NiVFNSVCRSU5NyVFMyU4MSU5OSVFMyU4MiU4QiZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9NDM5YjY5NjY3Nzg3ZTExYzdmYTM2YjI1ZDg3NTcyN2Y&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwa3N5dW5ubm4mdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPWUxMjJhOTA1NDdiNTMzNDI4MWY3YmU0M2U2Y2I1M2Rh&blend-x=142&blend-y=491&blend-mode=normal&s=1a611f7e8833ff640580434a1b03d27a");
  });

  it("ブログのカードの時はmiのサムネ画像が登録されている", () => {
    render(<Cards href={mockData.href} heading={mockData.heading} article={false} target={true} thumb={mockData.eyecatch!.url} />);
    const imageUrl = screen.getByRole("img");
    expect(imageUrl).toHaveAttribute("src", "https://images.microcms-assets.io/assets/c40f5f7d4fc2441ca54daeff9ff7ad21/fba46f876d1e4c84bc308b0e613a488c/blog-template.png");
  });

  it("カードが特定のURL(ここでは「/」)となっている", () => {
    render(<Cards href={mockData.href} heading={mockData.heading} article={true} target={true} thumb={""} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});

describe("MoveButtonコンポーネントのテスト", () => {
  it("「次へ進む」の文字列を見れる", async () => {
    render(<MoveButton className={""} area={"topBlog"} />);
    expect(screen.getByText("次へ進む")).toBeInTheDocument();
  });

  it("areaで設定した文字列がdata-area属性の値と一致している", () => {
    render(<MoveButton className={""} area={"topBlog"} />);

    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("data-area", "topBlog");
  });

  it("topBlogに設定したボタンでは遷移先が/blog/になる", async () => {
    render(<MoveButton className={""} area={"topBlog"} />);

    const btn = screen.getByRole("button");

    await waitFor(async () => {
      await userEvent.click(btn);

      await expect(mockedRouter).toHaveBeenCalledWith("/blogs/");
    });
  });
});
