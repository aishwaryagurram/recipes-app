import React, { useState } from 'react';
import userRecipes from '../../data/userRecipes';
import { useTranslation } from '../../TranslationContext';
import './UserRecipeSubmission.css';

function UserRecipeSubmission() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !ingredients || !description) {
      return;
    }
    const newRecipe = {
      id: 'user_' + Date.now(),
      title,
      ingredients: ingredients.split(',').map(i => i.trim()),
      description,
      image: preview,
      cuisine: 'User Submitted',
    };
    userRecipes.push(newRecipe);
    setTitle('');
    setIngredients('');
    setDescription('');
    setPreview(null);
    setSuccess(true);
  };

  return (
    <div className="user-recipe-container">
      <form onSubmit={handleSubmit}>
        <label>{t("recipeTitle")}</label>
        <input
          type="text"
          placeholder={t("recipeTitle")}
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <label>{t("ingredients")}</label>
        <textarea
          placeholder={t("ingredients")}
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          required
        />
        <label>{t("description")}</label>
        <textarea
          placeholder={t("description")}
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <label>{t("uploadImage")}</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="preview-image" />}
        <button type="submit">{t("submitRecipe")}</button>
        {success && (
          <div className="success-message">
            <h3>{t("recipeSubmitted")}</h3>
            <p>{t("thankYou")}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserRecipeSubmission;
