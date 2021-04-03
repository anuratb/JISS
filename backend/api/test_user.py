from .models import User


def test_new_user():
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check the email, password, and role fields are defined correctly
    """
    user  = User(username='ab', email='anuratb@yahoo.com', password='1234')
    assert user.email == 'anuratb@yahoo.com'
    assert user.password == '1234'
    
@pytest.fixture
def app():
    app = create_app('TestConfig')
    with app.app_context():
        yield app


@pytest.fixture
def authenticated_request(app):
    with app.test_request_context():
        # Here we're not overloading the login manager, we're just directly logging in a user
        # with whatever parameters we want. The user should only be logged in for the test,
        # so you're not polluting the other tests.
        yield flask_login.login_user(User(username='ab', email='anuratb@yahoo.com', password='1234'))


@pytest.mark.usefixtures("authenticated_request")
def test_empty_predicates():
    # The logic of your test goes here
