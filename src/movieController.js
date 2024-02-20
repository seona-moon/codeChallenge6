/*
제공된 blueprint로 MongoDB를 사용하여 CRUD (Create, Read, Update, Delete)를 만드세요. 만들어야할 URL(+컨트롤러)은 다음과 같습니다.

/: DB에 있는 모든 영화의 제목이 나열된 홈 페이지 (GET)
/upload: 영화를 생성하는 Form이 있는 페이지 (GET), 생성한 영화를 DB에 저장 (POST)
/movies/:id: 영화 상세 정보 페이지 (GET)
/movies/:id/edit: 영화를 편집하는 Form이 있는 페이지 (GET), 편집한 영화를 DB에 저장 (POST)
/movies/:id/delete: 영화 삭제 (GET)
/search: 제목별로 영화를 검색하는 페이지 (GET)
*/
import Movie from "./models/Movie";

// Add your magic here!
export const home = async (req, res) => {
  const movie = await Movie.find();
  return res.render("home", { pageTitle: "Movie!", movie });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
//title, summary, year, rating, genres
export const postUpload = async (req, res) => {
  const { title, summary, year, rating, genres } = req.body;
  try {
    await Movie.create({
      title,
      summary,
      year,
      rating,
      genres, //: Movie.formatGenre(genres)
    });
    console.log("Upload!");
    return res.redirect("/");
  } catch (error) {
    console.log(error._message);
    return res.render("upload", {
      pageTitle: "Upload Movie",
      errorMessage: error._message,
    });
  }
};

export const movieDetail = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (movie === null) {
    return res.render("404", { pageTitle: "movie not found." });
  }
  return res.render("watch", { pageTitle: movie.title, movie });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Movie.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let movie = [];
  if (keyword) {
    movie = await Movie.find({ title: { $regex: new RegExp(keyword, "i") } });
  }
  return res.render("search", { pageTitle: "Search", movie });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (movie === null) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  return res.render("edit", { pageTitle: `Editing ${movie.title}`, movie });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, summary, year, rating, genres } = req.body; //POST로부터 데이터를 받아옴
  await Movie.findByIdAndUpdate(id, {
    title,
    summary,
    year,
    rating,
    genres,
  });
  return res.redirect(`/movies/${id}`); //이전 페이지로 이동.
};
