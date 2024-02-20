export function parseUrlByBreed(url: string, prependedString: string): string | null {
  // Ensure the prependedString ends with a '/' for consistent parsing
  const normalizedPrependedString = prependedString.endsWith('/') ? prependedString : `${prependedString}/`;

  // Check if the URL contains the prependedString
  const indexOfPrependedString = url.indexOf(normalizedPrependedString);
  if (indexOfPrependedString === -1) {
    // The prepended string is not found in the URL
    return null;
  }

  // Extract the part of the URL that follows the prependedString
  const startIndex = indexOfPrependedString + normalizedPrependedString.length;
  let parsedPart = url.substring(startIndex);

  // Use a regular expression to find where the parsed part starts with '-' or '/'
  // and remove everything after that point.
  const matchString = parsedPart.match(/^[^/]*/).toString();
  const parsedSplitPart = matchString.split('-')
  const parsedReversed = parsedSplitPart.length > 1 ? `${parsedSplitPart[1]} ${parsedSplitPart[0]} ` : parsedSplitPart[0]

  return parsedReversed;
}