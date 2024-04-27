from flask import Flask, redirect, request, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

main = Flask(__name__)
main.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///guess_the_word.db'
db = SQLAlchemy(model_class=Base)
db.init_app(main)

class puzzle(db.Model):
    puzzle: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=True, unique=True) 
    questions: Mapped[str] = mapped_column(nullable=False)
    answers: Mapped[str] = mapped_column(nullable=False)
    final_answer: Mapped[str]

with main.app_context():
    db.create_all()

@main.route('/', methods=['POST', 'GET'])
def index():
    curr_puzzle = db.session.execute(db.select(puzzle)).scalar()
    answer_key = curr_puzzle.answers
    return render_template('index.html', answerKey=answer_key)

if __name__ == '__main__':
    main.run(debug=True)