// src/hooks/useVoiceRecognition.js
import { useState, useEffect } from "react";

/**
 * Hook personalizado para gestionar el reconocimiento de voz del navegador.
 * Utiliza la Web Speech API (window.SpeechRecognition).
 * * @returns {Object} Objeto con estados y funciones:
 * - text: Texto transcrito.
 * - isListening: Booleano, indica si el micrófono está activo.
 * - isSupported: Booleano, indica si el navegador soporta la API.
 * - startListening: Función para iniciar la escucha.
 * - stopListening: Función para detener la escucha.
 * - hasError: Booleano/String con el error si ocurre.
 */
const useVoiceRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [hasError, setHasError] = useState(null);
  let recognition = null;

  // Comprobamos si el navegador soporta la API al montar el hook
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setIsSupported(true);
    }
  }, []);

  // Función para inicializar y arrancar el reconocimiento
  const startListening = () => {
    setText("");
    setHasError(null);
    setIsListening(true);

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();

      recognition.lang = "es-ES"; // Configuramos el idioma español
      recognition.continuous = false; // Se detiene después de una frase
      recognition.interimResults = false; // Solo devuelve resultados finales

      // Evento: Se recibe un resultado
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        setIsListening(false);
      };

      // Evento: Error en el reconocimiento
      recognition.onerror = (event) => {
        console.error("Error en reconocimiento de voz:", event.error);
        setHasError(event.error);
        setIsListening(false);
      };

      // Evento: Finaliza la escucha (por silencio o por comando)
      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      setHasError("Error al iniciar el servicio de voz");
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return {
    text,
    isListening,
    isSupported,
    hasError,
    startListening,
    stopListening,
  };
};

export default useVoiceRecognition;