using System.Threading.Tasks;

namespace SellMyVehicle.Persistence
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}