package priv.together.back.entity;

public class BoardSimplify {
    int board_id;

    String content;

    String board_time;

    public BoardSimplify(int board_id, String content, String board_time) {
        this.board_id = board_id;
        this.content = content;
        this.board_time = board_time;
    }

    public int getBoard_id() {
        return board_id;
    }

    public void setBoard_id(int board_id) {
        this.board_id = board_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getBoard_time() {
        return board_time;
    }

    public void setBoard_time(String board_time) {
        this.board_time = board_time;
    }
}
