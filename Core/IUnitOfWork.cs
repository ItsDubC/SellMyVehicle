using System.Threading.Tasks;

namespace SellMyVehicle.Core
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}