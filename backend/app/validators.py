from marshmallow import ValidationError


def not_blank(value: str):
    if not value.strip():
        raise ValidationError('Must not be blank.')


def phone_number(value: str):
    if not (value.startswith('+') and value[1:].isdigit() and len(value) > 11):
        raise ValidationError('Invalid phone number.')
