import Env from './env/Env';
import app from './app';

const PORT = Env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}\n🔗 Click to open: http://localhost:${PORT}`);
});