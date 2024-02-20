import express from "express";
import {
  home,
  movieDetail,
  getUpload,
  postUpload,
  getEdit,
  postEdit,
  deleteVideo,
  search,
} from "./movieController";

const movieRouter = express.Router();

/*
제공된 blueprint로 MongoDB를 사용하여 CRUD (Create, Read, Update, Delete)를 만드세요. 만들어야할 URL(+컨트롤러)은 다음과 같습니다.

/: DB에 있는 모든 영화의 제목이 나열된 홈 페이지 (GET)
/upload: 영화를 생성하는 Form이 있는 페이지 (GET), 생성한 영화를 DB에 저장 (POST)
/movies/:id: 영화 상세 정보 페이지 (GET)
/movies/:id/edit: 영화를 편집하는 Form이 있는 페이지 (GET), 편집한 영화를 DB에 저장 (POST)
/movies/:id/delete: 영화 삭제 (GET)
/search: 제목별로 영화를 검색하는 페이지 (GET)
*/

movieRouter.get("/", home);
movieRouter.route("/upload").get(getUpload).post(postUpload);
movieRouter.get("/search", search);
movieRouter.get("/movies/:id", movieDetail);
movieRouter.route("/movies/:id/edit").get(getEdit).post(postEdit);
movieRouter.get("/movies/:id/delete", deleteVideo);

export default movieRouter;
