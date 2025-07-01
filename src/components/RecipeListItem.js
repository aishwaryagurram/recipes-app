import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Icon } from "semantic-ui-react";
import userRecipes from "../data/userRecipes";
import { useTranslation } from "../TranslationContext";

function RecipeListItem({ recipe }) {
  const { t } = useTranslation();
  const isUserRecipe = recipe.id && recipe.id.startsWith("user_");

  const handleRemove = () => {
    const index = userRecipes.findIndex(r => r.id === recipe.id);
    if (index !== -1) {
      userRecipes.splice(index, 1);
      window.location.reload(); // simple way to re-render list after removal
    }
  };

  const handleShare = () => {
    const shareData = {
      title: recipe.title,
      text: `Check out this recipe: ${recipe.title}`,
      url: window.location.origin + (isUserRecipe ? `/recipes/user/${recipe.id}` : `/recipes/${recipe.recipe_id}`),
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      // fallback: copy URL to clipboard
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert(t("recipeURL") + " " + t("copiedToClipboard"));
      });
    }
  };

  return (
    <Card>
      <img src={recipe.image_url || recipe.image} height={170} alt="thumbnail" />
      <Card.Content>
        <Card.Header content={recipe.title} />
        <Card.Description>
          <h4 className="text-cursive txt-yellow">{recipe.publisher || recipe.cuisine}</h4>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          as={Link}
          to={isUserRecipe ? `/recipes/user/${recipe.id}` : `/recipes/${recipe.recipe_id}`}
          content={t("details")}
          color="blue"
          size="tiny"
        />
        <Button
          as={"a"}
          href={recipe.source_url}
          target="_blank"
          content={t("recipeURL")}
          color="green"
          size="tiny"
        />
        {isUserRecipe && (
          <>
            <Button icon color="red" size="tiny" onClick={handleRemove} title={t("removeRecipe")}>
              <Icon name="trash" />
            </Button>
            <Button icon color="teal" size="tiny" onClick={handleShare} title={t("shareRecipe")}>
              <Icon name="share alternate" />
            </Button>
          </>
        )}
      </Card.Content>
    </Card>
  );
}
export default RecipeListItem;
