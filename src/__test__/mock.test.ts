import { connectDB } from "../server";
import server from "../server";
import db from "../config/db";

jest.mock('../config/db.ts')


describe('connectDB', () => {
  it('should handle database connection error', async () => {
    jest.spyOn(db, 'authenticate')
      .mockRejectedValue(new Error('Hubo un error al conectar la DB'))
    const consoleSpy = jest.spyOn(console, 'log')

    await connectDB()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Hubo un error al conectar a la DB')
    )
  })
})