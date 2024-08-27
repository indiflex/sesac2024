import { books } from '../bookdata';

type Params = {
  params: {
    bookId: string;
  };
};

const getBook = (bookId: string) => books.find((book) => book.id === +bookId);

export async function GET(_request: Request, { params: { bookId } }: Params) {
  const book = books.find((book) => book.id === +bookId);
  return Response.json(book);
}

export async function PATCH(request: Request, { params: { bookId } }: Params) {
  const { title } = await request.json();
  const book = getBook(bookId);
  if (!book) {
    throw new Error('404 Not Found');
  }

  book.title = title;

  return Response.json(books);
}

export async function DELETE(
  _request: Request,
  { params: { bookId } }: Params
) {
  const idx = books.findIndex((book) => book.id === +bookId);
  books.splice(idx, 1);
  return Response.json(books);
}
