from marshmallow import ValidationError


def not_blank(value: str):
    if not value.strip():
        raise ValidationError('Must not be blank.')
