CREATE TABLE answers (
    id INT AUTO_INCREMENT UNIQUE KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    question_id INT NOT NULL,
    answer INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (quiz_id) REFERENCES quiz(id),
    FOREIGN KEY (question_id) REFERENCES questions(id),
    PRIMARY KEY (user_id, quiz_id, question_id)
);