from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'body', 'image']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'field-input', 'placeholder': 'Post title'}),
            'body': forms.Textarea(attrs={'class': 'field-textarea', 'rows': 10, 'placeholder': 'Write your dev log...'}),
            'image': forms.ClearableFileInput(attrs={'class': 'field-input'}),
        } 
