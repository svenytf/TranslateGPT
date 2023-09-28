import type { Language } from "../../../types";

/**
 * Formatting:
 * language: {
 *  shortcode: string;
 *  name: string;
 *  flagUnicode?: string;
 * }
 * 
 * if flagUnicode is not defined, there will be no flag.
 * the openai API reads the shortcode, so make sure that the shortcode is correct.
 * if it's a fictional language, just make the shortcode the name of the language.
 */
export const languages: Language[] = [
    { shortcode: 'en', name: 'English', flagUnicode: '🇺🇸' },
    { shortcode: 'de', name: 'German', flagUnicode: '🇩🇪' },
    { shortcode: 'fr', name: 'French', flagUnicode: '🇫🇷' },
    { shortcode: 'es', name: 'Spanish', flagUnicode: '🇪🇸' },
    { shortcode: 'it', name: 'Italian', flagUnicode: '🇮🇹' },
    { shortcode: 'pt', name: 'Portuguese', flagUnicode: '🇵🇹' },
    { shortcode: 'ru', name: 'Russian', flagUnicode: '🇷🇺' },
    { shortcode: 'zh', name: 'Chinese (Mandarin)', flagUnicode: '🇨🇳' },
    { shortcode: 'ja', name: 'Japanese', flagUnicode: '🇯🇵' },
    { shortcode: 'ko', name: 'Korean', flagUnicode: '🇰🇷' },
    { shortcode: 'sv', name: 'Swedish', flagUnicode: '🇸🇪' },
    { shortcode: 'nl', name: 'Dutch', flagUnicode: '🇳🇱' },
    { shortcode: 'no', name: 'Norwegian', flagUnicode: '🇳🇴' },
    { shortcode: 'da', name: 'Danish', flagUnicode: '🇩🇰' },
    { shortcode: 'ar', name: 'Arabic', flagUnicode: '🇸🇦' },
    { shortcode: 'hi', name: 'Hindi', flagUnicode: '🇮🇳' },
    { shortcode: 'tr', name: 'Turkish', flagUnicode: '🇹🇷' },
    { shortcode: 'pl', name: 'Polish', flagUnicode: '🇵🇱' },
    { shortcode: 'fi', name: 'Finnish', flagUnicode: '🇫🇮' },
    { shortcode: 'el', name: 'Greek', flagUnicode: '🇬🇷' },
    { shortcode: 'cs', name: 'Czech', flagUnicode: '🇨🇿' },
    { shortcode: 'hu', name: 'Hungarian', flagUnicode: '🇭🇺' },
    { shortcode: 'id', name: 'Indonesian', flagUnicode: '🇮🇩' },
    { shortcode: 'ms', name: 'Malay', flagUnicode: '🇲🇾' },
    { shortcode: 'th', name: 'Thai', flagUnicode: '🇹🇭' },
    { shortcode: 'uk', name: 'Ukrainian', flagUnicode: '🇺🇦' },
    { shortcode: 'vi', name: 'Vietnamese', flagUnicode: '🇻🇳' },
    { shortcode: 'ro', name: 'Romanian', flagUnicode: '🇷🇴' },
    { shortcode: 'he', name: 'Hebrew', flagUnicode: '🇮🇱' },
    { shortcode: 'bn', name: 'Bengali', flagUnicode: '🇧🇩' },
    { shortcode: 'bg', name: 'Bulgarian', flagUnicode: '🇧🇬' },
    { shortcode: 'ca', name: 'Catalan', flagUnicode: '🇪🇸' },
    { shortcode: 'hr', name: 'Croatian', flagUnicode: '🇭🇷' },
    { shortcode: 'pirate', name: 'Pirate', flagUnicode: '🏴‍☠️' },
    { shortcode: 'yoda', name: 'Yoda' },
    { shortcode: 'minion', name: 'Minion' }
];