from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import  DeclarativeBase, Mapped, mapped_column

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(app)

class Person(db.Model):
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    name: Mapped[str] = mapped_column(db.String)
    surname: Mapped[str] = mapped_column(db.String)
    job: Mapped[str] = mapped_column(db.String)
    
    def __init__(self, name, surname, job):
        self.name = name
        self.surname = surname
        self.job = job

ma = Marshmallow(app)

class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person
        
        
# INIT DB DATA
with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add(Person(name="ser",surname="serowy",job='it'))
    print("\033[4m" + "\033[1m" + "\033[96m" + "[SQLite] Added person - ser serowy it" + "\033[0m")
    db.session.add(Person(name="Jan",surname="Kowalski",job='FE Developer'))
    print("\033[4m" + "\033[1m" + "\033[96m" + "[SQLite] Added person - Jan Kowalski FE Developer" + "\033[0m")
    db.session.add(Person(name="Piotr",surname="Nowak",job='BE Developer'))
    print("\033[4m" + "\033[1m" + "\033[96m" + "[SQLite] Added person - Piotr Nowak BE Developer" + "\033[0m")
    
    db.session.commit()

# ENDPOINTS

@app.route('/', methods=['GET'])
def get_index():
    return jsonify({'message': 'Hello, World!'})

@app.route('/people', methods=['GET'])
def get_persons():
    people = db.session.execute(db.select(Person)).scalars()
    return jsonify(PersonSchema(many=True).dump(people)), 200

@app.route('/people/<int:person_id>', methods=['GET'])
def get_person(person_id):
    person = Person.query.get_or_404(person_id)
    print(person)
    print(PersonSchema().dump(person))
    return jsonify(PersonSchema().dump(person)), 200

@app.route('/people', methods=['POST'])
def add_person():
    name = request.json['name']
    surname = request.json['surname']
    job = request.json['job']
    new_person = Person(name=name, surname=surname, job=job)
    db.session.add(new_person)
    db.session.commit()
    return jsonify(PersonSchema().dump(new_person)), 201

# @app.route('/person/<int:person_id>', methods=['PUT'])
# def update_person(person_id):
#     person = Person.query.get_or_404(person_id)
#     person.name = request.json['name']
#     person.surname = request.json['surname']
#     person.job = request.json['job']
#     db.session.commit()
#     return jsonify(PersonSchema().dump(person))

# @app.route('/person/<int:person_id>', methods=['DELETE'])
# def delete_person(person_id):
#     person = Person.query.get_or_404(person_id)
#     db.session.delete(person)
#     db.session.commit()
#     return jsonify({'message': 'Person deleted'})


if __name__ == '__main__':
    app.run()