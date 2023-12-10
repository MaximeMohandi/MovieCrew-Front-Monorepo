export const expectToMatchEmbedMessage = (
  response: unknown,
  expectedEmbed: unknown,
) => {
  expect(response).toMatchObject({ embeds: [expectedEmbed] });
};
