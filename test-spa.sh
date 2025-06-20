#!/bin/bash

# Script de test pour vérifier le routage SPA en local avant déploiement

echo "🔄 Construction du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
    
    echo "🔄 Démarrage du serveur preview..."
    echo "📝 Testez les URLs suivantes dans votre navigateur :"
    echo "   - http://localhost:3000/"
    echo "   - http://localhost:3000/test"
    echo "   - http://localhost:3000/login" 
    echo "   - http://localhost:3000/register"
    echo "   - http://localhost:3000/dashboard"
    echo "   - http://localhost:3000/route-inexistante (devrait afficher la page 404)"
    echo ""
    echo "⚠️  IMPORTANT : Testez l'accès direct à ces URLs (pas seulement la navigation)"
    echo "   et actualisez chaque page (F5) pour vérifier que le routage fonctionne."
    echo ""
    echo "🛑 Appuyez sur Ctrl+C pour arrêter le serveur"
    
    npm run preview
else
    echo "❌ Erreur lors du build !"
    exit 1
fi
