from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=120,
        widget=forms.TextInput(attrs={"class": "field-input", "placeholder": "Your name"}),
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={"class": "field-input", "placeholder": "you@example.com"}),
    )
    message = forms.CharField(
        widget=forms.Textarea(
            attrs={"class": "field-textarea", "rows": 6, "placeholder": "Tell me about your idea..."}
        )
    )
